package com.example.unistat.classes;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.unistat.R;
import com.example.unistat.ui.stats.ViewMentorProfileActivity;
import com.google.android.material.card.MaterialCardView;
import com.squareup.picasso.Picasso;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import de.hdodenhof.circleimageview.CircleImageView;

public class CardAdapter extends RecyclerView.Adapter<CardAdapter.StatsHolder>{

    // CardAdapter Class
    private Context mContext;
    private ArrayList<StatsCards> stats;

    public CardAdapter(Context mContext, ArrayList<StatsCards> stats) {
        this.mContext = mContext;
        this.stats = stats;
    }

    @NonNull
    @Override
    public StatsHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.item_card_template, parent, false);
        return new StatsHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull StatsHolder holder, int position) {
        StatsCards curStat = stats.get(position);
        holder.mentorNameCard.setText(curStat.getMentorName());
        holder.univNameCard.setText(curStat.getUnivName());
        holder.univMajorCard.setText(curStat.getUnivMajor());
        holder.univGpaCard.setText(String.valueOf(curStat.getUnivGpa()));
        holder.univEntranceScoreCard.setText(String.valueOf(curStat.getUnivEntranceScore()));
        holder.cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent openMentorProfile = new Intent(view.getContext(), ViewMentorProfileActivity.class);
                JSONObject currStat = new JSONObject();

                try {
                    currStat.put("mentorEmail", curStat.getMentorEmail());
                    currStat.put("mentorName", curStat.getMentorName());
                    currStat.put("mentorPhoto", curStat.getUserStatProfileImage());
                    currStat.put("univName", curStat.getUnivName());
                    currStat.put("univMajor", curStat.getUnivMajor());
                    currStat.put("univGpa", String.valueOf(curStat.getUnivGpa()));
                    currStat.put("univEntranceScore", String.valueOf(curStat.getUnivEntranceScore()));
                    currStat.put("univBio", curStat.getUnivBio());
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                openMentorProfile.putExtra("currStat", currStat.toString());
                view.getContext().startActivity(openMentorProfile);
            }
        });
        Picasso.get().load(curStat.getUserStatProfileImage()).resize(100, 100).into(holder.userStatProfileImage);
    }

    @Override
    public int getItemCount() {
        return stats.size();
    }

    //View Holder Class: StatsHolder
    class StatsHolder extends RecyclerView.ViewHolder{
        private TextView mentorNameCard;
        private TextView univNameCard;
        private TextView univMajorCard;
        private TextView univGpaCard;
        private TextView univEntranceScoreCard;
        private MaterialCardView cardView;
        private CircleImageView userStatProfileImage;

        public StatsHolder(View itemView) {
            super(itemView);
            cardView = itemView.findViewById(R.id.card);
            mentorNameCard = itemView.findViewById(R.id.mentorName);
            univNameCard = itemView.findViewById(R.id.univName);
            univMajorCard = itemView.findViewById(R.id.univMajor);
            univGpaCard = itemView.findViewById(R.id.univGpa);
            univEntranceScoreCard = itemView.findViewById(R.id.univEntranceScore);
            userStatProfileImage = itemView.findViewById(R.id.userStatProfileImage);
        }

        void setDetails(StatsCards stats){
            mentorNameCard.setText(stats.getMentorName());
            univNameCard.setText(stats.getUnivName());
            univMajorCard.setText(String.valueOf(stats.getUnivGpa()));
            univGpaCard.setText(String.valueOf(stats.getUnivGpa()));
            univEntranceScoreCard.setText(stats.getUnivEntranceScore());
            Picasso.get().load(stats.getUserStatProfileImage()).resize(100, 100).into(userStatProfileImage);
        }

    }

}